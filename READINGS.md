# Readings

## Concurrency Control in Groupware Systems (Ellis & Gibbs, 1989)

**Paper:** https://dl.acm.org/doi/abs/10.1145/67544.66963

This is the foundational paper that introduced **Operational Transformation (OT)**, which became the basis for collaborative editing in Google Docs, Etherpad, and many other real-time collaboration tools.

### The Problem

In real-time groupware (e.g. collaborative text editors), multiple users edit the same document simultaneously. Traditional concurrency control (locking, serialization) doesn't work well because:

- **Locking** is too slow — users need instant feedback on their own edits
- **Turn-taking** kills the feeling of real-time collaboration
- You need **local responsiveness** (your keystrokes appear immediately) while maintaining **consistency** (everyone converges to the same document state)

### The Core Idea: Operational Transformation

Instead of locking or serializing, every user applies their own operations **immediately** to their local copy. When remote operations arrive, they are **transformed** against operations that have already been applied locally.

#### How it works step-by-step:

1. **Each edit is an operation** — e.g. `Insert('A', position=5)` or `Delete(position=3)`

2. **Apply locally first** — when you type, the operation is applied to your local copy instantly (no waiting)

3. **Broadcast to others** — the operation is sent to all other participants

4. **Transform on receipt** — when a remote operation arrives, it can't be applied as-is because your local state has diverged. You **transform** it against any concurrent local operations to adjust positions.

#### Classic example:

Starting document: `"ABC"`

- **User 1** does `Insert('X', pos=1)` → sees `"AXBC"`
- **User 2** concurrently does `Delete(pos=2)` (delete 'C') → sees `"AB"`

When User 1 receives User 2's `Delete(pos=2)`:
- User 1 already inserted at position 1, shifting everything right
- So the delete must be **transformed**: `Delete(pos=2)` → `Delete(pos=3)` to still target 'C'

When User 2 receives User 1's `Insert('X', pos=1)`:
- User 2 already deleted at position 2, but that's *after* position 1
- So the insert stays as-is: `Insert('X', pos=1)`

Both converge to `"AXB"`.

#### The transformation function

The paper defines `T(op1, op2)` — a function that takes an operation and transforms it against another concurrent operation so it produces the correct effect in a different execution context. The key property:

- **Convergence (CP1)**: applying `op1` then `T(op2, op1)` must produce the same state as applying `op2` then `T(op1, op2)`
- This ensures all sites converge to the same document regardless of operation arrival order

### The dOPT Algorithm

The paper presents the **dOPT (distributed OPeration Transformation)** algorithm:

- Each site maintains a **state vector** (like a vector clock) tracking how many operations from each site have been applied
- When a remote operation arrives, the site identifies which local operations are **concurrent** with it
- The remote operation is transformed against each concurrent local operation before being applied
- This ensures convergence without any locking or central coordination

### Why It Matters

This paper essentially created the theoretical foundation for real-time collaborative editing. Google Docs, Apache Wave, and many collaborative tools used OT (or its successors like CRDTs) directly derived from this work. The key insight — apply locally, transform remotely — solved the tension between responsiveness and consistency in a way that locking never could.
