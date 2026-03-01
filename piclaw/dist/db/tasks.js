import { getDb } from "./connection.js";
export function createTask(task) {
    const db = getDb();
    db.prepare(`INSERT INTO scheduled_tasks (id, chat_jid, prompt, model, schedule_type, schedule_value, next_run, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(task.id, task.chat_jid, task.prompt, task.model ?? null, task.schedule_type, task.schedule_value, task.next_run, task.status, task.created_at);
}
export function getTaskById(id) {
    const db = getDb();
    return db.prepare("SELECT * FROM scheduled_tasks WHERE id = ?").get(id);
}
export function updateTask(id, updates) {
    const fields = [];
    const values = [];
    if (updates.prompt !== undefined) {
        fields.push("prompt = ?");
        values.push(updates.prompt);
    }
    if (updates.model !== undefined) {
        fields.push("model = ?");
        values.push(updates.model);
    }
    if (updates.schedule_type !== undefined) {
        fields.push("schedule_type = ?");
        values.push(updates.schedule_type);
    }
    if (updates.schedule_value !== undefined) {
        fields.push("schedule_value = ?");
        values.push(updates.schedule_value);
    }
    if (updates.next_run !== undefined) {
        fields.push("next_run = ?");
        values.push(updates.next_run);
    }
    if (updates.status !== undefined) {
        fields.push("status = ?");
        values.push(updates.status);
    }
    if (fields.length === 0)
        return;
    values.push(id);
    const db = getDb();
    db.prepare(`UPDATE scheduled_tasks SET ${fields.join(", ")} WHERE id = ?`).run(...values);
}
export function deleteTask(id) {
    const db = getDb();
    db.prepare("DELETE FROM task_run_logs WHERE task_id = ?").run(id);
    db.prepare("DELETE FROM scheduled_tasks WHERE id = ?").run(id);
}
export function getDueTasks() {
    const db = getDb();
    const now = new Date().toISOString();
    return db
        .prepare(`SELECT * FROM scheduled_tasks
       WHERE status = 'active' AND next_run IS NOT NULL AND next_run <= ?
       ORDER BY next_run`)
        .all(now);
}
export function updateTaskAfterRun(id, nextRun, lastResult) {
    const db = getDb();
    const now = new Date().toISOString();
    db.prepare(`UPDATE scheduled_tasks
     SET next_run = ?, last_run = ?, last_result = ?, status = CASE WHEN ? IS NULL THEN 'completed' ELSE status END
     WHERE id = ?`).run(nextRun, now, lastResult, nextRun, id);
}
export function logTaskRun(log) {
    const db = getDb();
    db.prepare(`INSERT INTO task_run_logs (task_id, run_at, duration_ms, status, result, error)
     VALUES (?, ?, ?, ?, ?, ?)`).run(log.task_id, log.run_at, log.duration_ms, log.status, log.result, log.error);
}
export function getTaskRunLogs(taskId) {
    const db = getDb();
    return db
        .prepare("SELECT * FROM task_run_logs WHERE task_id = ? ORDER BY run_at")
        .all(taskId);
}
