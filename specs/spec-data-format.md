The data format works as follows.

There is a single remote data store. It has the semantics of being a Dropbox-like backend - it is organised as a file system bucket, where each file has a path, forming a directory tree.

For concurrently written to objects, we organise writes per-device (using a device ID) and marked with the timestamp of a write into a WRITE AHEAD LOG.

Blobs are organised separately.

Each log written is a CRDT operation. The remote data store is thus used as a sync engine, whereby each writer is in fact a peer. There is no client-server model except between clients and the remote backend.

The CRDT operations enable the notebook to sync seamlessly with multi-device edits.

Each client maintains a local view of the datastructure by reducing all WAL logs into a single state. This data is maintained in the local folder (appdata on windows, .local on linux). 

Upon editing the notebook, the client creates a CRDT op, appends it to the local log and to the remote log. The edit is persisted immediately to UI state. The UI state is not computed from snapshot state, rather it is based on a browser UI runtime. 

