# PiClaw - Minimal Pi Coding Agent Sandbox
FROM debian:bookworm-slim

# Environment variables
ENV DEBIAN_FRONTEND=noninteractive \
    TERM=xterm-256color \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    HOME=/home/agent

WORKDIR /tmp

# Layer 1: System packages (minimal set for bun/brew/pi)
RUN apt-get update && \
    apt-get install -y --no-install-recommends locales tzdata && \
    sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen en_US.UTF-8 && \
    update-locale LANG=en_US.UTF-8 && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates curl wget unzip \
    bash-completion sudo less man \
    git vim tmux htop tree ripgrep jq \
    net-tools iproute2 dnsutils \
    rsync file strace \
    build-essential cmake make pkg-config \
    procps psmisc && \
    apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Layer 2: Create user
RUN useradd -m -s /bin/bash -G sudo agent && \
    echo 'agent:agent' | chpasswd && \
    echo 'agent ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    mkdir -p /etc/skel.agent

# Layer 3: Entrypoint with home directory initialization
RUN cat > /entrypoint.sh <<'ENTRYPOINT'
#!/bin/bash
set -e

MARKER_FILE="/home/agent/.container_initialized"
HOME_DIR="/home/agent"
SKEL_DIR="/etc/skel.agent"

if [ ! -f "$MARKER_FILE" ] || [ ! -f "$HOME_DIR/.bashrc" ]; then
    echo "Initializing home directory..."
    if [ -d "$SKEL_DIR" ] && [ "$(ls -A $SKEL_DIR 2>/dev/null)" ]; then
        cp -a "$SKEL_DIR/." "$HOME_DIR/"
    fi

    if [ ! -f "$HOME_DIR/.bashrc" ]; then
        cat > "$HOME_DIR/.bashrc" <<'BASHRC'
case $- in *i*) ;; *) return;; esac
HISTCONTROL=ignoreboth
shopt -s histappend
HISTSIZE=1000
HISTFILESIZE=2000
shopt -s checkwinsize
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
fi
alias ll='ls -alF'
alias la='ls -A'
[ -d /home/linuxbrew/.linuxbrew ] && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
[ -d "$HOME/.bun" ] && export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH"
BASHRC
    fi

    if [ ! -f "$HOME_DIR/.profile" ]; then
        cat > "$HOME_DIR/.profile" <<'PROFILE'
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
[ -d "$HOME/bin" ] && PATH="$HOME/bin:$PATH"
PROFILE
    fi

    # Ensure pi config directories exist
    mkdir -p "$HOME_DIR/.pi/agent/skills" \
             "$HOME_DIR/.pi/agent/sessions" \
             "$HOME_DIR/.pi/agent/extensions" \
             "$HOME_DIR/.pi/agent/prompts" \
             "$HOME_DIR/.pi/agent/themes"

    # Symlink persistent config from /config if mounted
    for item in .gitconfig .pi; do
        target="/config/$item"
        link="$HOME_DIR/$item"
        if [ -e "$target" ] || [ -d "$target" ]; then
            rm -rf "$link" 2>/dev/null || true
            ln -sf "$target" "$link"
        fi
    done

    chown -R agent:agent "$HOME_DIR"
    echo "$(id -u agent):$(id -g agent)" > "$MARKER_FILE"
fi

# Ensure workspace has AGENTS.md (system prompt for pi)
if [ -d "/workspace" ] && [ ! -f "/workspace/AGENTS.md" ]; then
    if [ -f "$HOME_DIR/workspace-skel/AGENTS.md" ]; then
        cp "$HOME_DIR/workspace-skel/AGENTS.md" /workspace/AGENTS.md
        chown agent:agent /workspace/AGENTS.md
    fi
fi

# Ensure workspace has project-level skills
if [ -d "/workspace" ] && [ ! -d "/workspace/.pi/skills" ]; then
    if [ -d "$HOME_DIR/workspace-skel/.pi/skills" ]; then
        mkdir -p /workspace/.pi
        cp -a "$HOME_DIR/workspace-skel/.pi/skills" /workspace/.pi/skills
        chown -R agent:agent /workspace/.pi
    fi
fi

echo "=== PiClaw - Pi Coding Agent Sandbox ==="
echo "Container idle. Attach with: docker exec -u agent -it <name> bash"
echo "Run 'pi' for interactive mode, or start piclaw for WhatsApp integration."
exec tail -f /dev/null
ENTRYPOINT
RUN chmod +x /entrypoint.sh

# Layer 4: Install Homebrew, Bun, and Pi Coding Agent as agent
USER agent
WORKDIR /home/agent
RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" && \
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc && \
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" && \
    brew update && \
    brew install lazygit && \
    curl -fsSL https://bun.sh/install | bash && \
    export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && \
    bun add -g @mariozechner/pi-coding-agent && \
    PI_CLI="$(readlink -f $BUN_INSTALL/bin/pi)" && \
    rm "$BUN_INSTALL/bin/pi" && \
    printf '#!/usr/bin/env bash\nexec bun "%s" "$@"\n' "$PI_CLI" > "$BUN_INSTALL/bin/pi" && \
    chmod +x "$BUN_INSTALL/bin/pi"

# Set up pi config directories and global AGENTS.md
RUN mkdir -p ~/.pi/agent/skills ~/.pi/agent/sessions \
             ~/.pi/agent/extensions ~/.pi/agent/prompts ~/.pi/agent/themes

# Ship workspace skeleton (includes .pi/skills/ and AGENTS.md)
COPY --chown=agent:agent skel/ /home/agent/workspace-skel/

# Ship piclaw global skills (IPC: schedule, send-message)
COPY --chown=agent:agent piclaw/skills/ /home/agent/.pi/agent/skills/

# Ship piclaw orchestrator and install as global binary
COPY --chown=agent:agent piclaw/ /home/agent/piclaw/
RUN export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && \
    cd /home/agent/piclaw && bun update && bun install && \
    cd /tmp && bun add -g --no-save file:/home/agent/piclaw

# Layer 5: Save skeleton
USER root
RUN cp -a /home/agent/. /etc/skel.agent/ && \
    echo "Skeleton: $(find /etc/skel.agent -type f | wc -l) files"

ENTRYPOINT ["/entrypoint.sh"]
