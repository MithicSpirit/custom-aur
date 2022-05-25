#!/usr/bin/env node

const makeflags = process.env.MAKEFLAGS;
if (makeflags === undefined) process.exit(0);

matches = makeflags.matchAll(/-+j(?:obs)?(?: *|=)(?<threads>\d+)/gm);
let last_match;
let next_match;
do {
	last_match = next_match;
	next_match = matches.next();
} while (!next_match.done);

if (
	last_match === undefined ||
	(val = last_match.value) === undefined ||
	(gps = val.groups) === undefined ||
	(thr = gps.threads) === undefined
)
	process.exit(0);

process.stdout.write("--jCmd=");
process.stdout.write(thr);
