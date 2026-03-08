# PiClaw - Minimal Pi Coding Agent Sandbox
FROM debian:bookworm-slim

ARG HOMEBREW_BREW_GIT_REMOTES=""
ARG HOMEBREW_CORE_GIT_REMOTES=""
ARG PI_CODING_AGENT_VERSION="0.57.0"

# Environment variables
ENV DEBIAN_FRONTEND=noninteractive \
    TERM=xterm-256color \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    HOME=/home/agent \
    HOMEBREW_NO_AUTO_UPDATE=1 \
    HOMEBREW_NO_INSTALL_CLEANUP=1 \
    HOMEBREW_BREW_GIT_REMOTES=${HOMEBREW_BREW_GIT_REMOTES} \
    HOMEBREW_CORE_GIT_REMOTES=${HOMEBREW_CORE_GIT_REMOTES} \
    PI_CODING_AGENT_VERSION=${PI_CODING_AGENT_VERSION} \
    BUN_INSTALL=/usr/local/lib/bun \
    PATH=/usr/local/lib/bun/bin:/home/linuxbrew/.linuxbrew/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

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
    procps psmisc supervisor sqlite3 restic openssh-client && \
    mkdir -p /etc/supervisor/conf.d /var/log/supervisor /var/log/piclaw /var/run/supervisor && \
    apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Layer 2: Create user
RUN useradd -m -s /bin/bash -G sudo agent && \
    echo 'agent:agent' | chpasswd && \
    echo 'agent ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    mkdir -p /etc/skel.agent && \
    chown -R agent:agent /var/log/piclaw

# Layer 3: Entrypoint + Supervisor
COPY entrypoint.sh /entrypoint.sh
COPY supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY supervisor/conf.d/ /etc/supervisor/conf.d/
COPY supervisor/run-piclaw.sh /usr/local/bin/run-piclaw.sh
COPY supervisor/supervisord.workspace.conf /usr/local/share/piclaw/supervisor/supervisord.conf
COPY supervisor/conf.d/ /usr/local/share/piclaw/supervisor/conf.d/
COPY scripts/docker/install-agent-runtime.sh /tmp/install-agent-runtime.sh
COPY scripts/docker/build-piclaw-package.sh /tmp/build-piclaw-package.sh
RUN chmod +x /entrypoint.sh /usr/local/bin/run-piclaw.sh /tmp/install-agent-runtime.sh /tmp/build-piclaw-package.sh

# Layer 4: Install Homebrew, Bun, and Pi Coding Agent globally
#   Homebrew needs the agent user; bun/pi/piclaw go into /usr/local/lib/bun/
USER agent
WORKDIR /home/agent
RUN /tmp/install-agent-runtime.sh

# Set up pi config directories
USER root
RUN mkdir -p /home/agent/.pi/agent/skills /home/agent/.pi/agent/sessions \
             /home/agent/.pi/agent/extensions /home/agent/.pi/agent/prompts /home/agent/.pi/agent/themes && \
    chown -R agent:agent /home/agent/.pi

# Ship workspace skeleton (includes .pi/skills/ and AGENTS.md)
COPY --chown=agent:agent skel/ /home/agent/workspace-skel/

# Ship piclaw global skills (IPC: schedule, send-message)
COPY --chown=agent:agent piclaw/skills/ /home/agent/.pi/agent/skills/

# Ship piclaw orchestrator and install globally
COPY --chown=agent:agent piclaw/ /home/agent/piclaw/
RUN /tmp/build-piclaw-package.sh && rm -f /tmp/install-agent-runtime.sh /tmp/build-piclaw-package.sh

# Layer 5: Save skeleton
RUN cp -a /home/agent/. /etc/skel.agent/ && \
    echo "Skeleton: $(find /etc/skel.agent -type f | wc -l) files"

ENTRYPOINT ["/entrypoint.sh"]
