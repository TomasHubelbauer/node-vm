# Node VM

I have a Node-based script runner with two modes of operation: process and
require. It has a set of scripts with their schedules and runs them based on
those schedules. Some scripts are invoked using the *process* mode - `cp`. Some
are invoked by `require`-ing them.

I want to transition all scripts to the `require`-based mode, however, it is
harder to make isolated. For scripts which run using require, I override their
`console` methods to capture as their output (as opposed to `stdout` and `stderr`
of the `cp` based mode) and `try`-`catch` their execution to capture their
errors. I also have to reset `process.argv` and walk into their directory using
`process.chdir` and back out after their execution so that from their perspective
it is as if they were ran using `node .` in their directory and not `require` in
the runner's directory.

This feels brittle and I'm looking for a better way and I figured Node's VM
might be it. However, as this code showcases, that's not the case. Not only
would I have to redefine all the APIs the scripts might use (which currently I
just need to _sanitize_ them as the script might use them and I need to fool it
into thinking they are the same as if it was run directly and not `require`d),
but there is a problem with `require` in the VM basically undoing the whole
context rendering the whole exercise useless. Without `require` in the script
I would have the send in the script content as text, which is fine, but the
script itself also might have dependencies and that's where it all breaks down.

## Running

`node . test`
