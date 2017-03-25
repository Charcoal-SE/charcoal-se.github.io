#!/usr/bin/env ruby

require 'json'

smokey_commit = `cd smokey && git rev-parse HEAD`.strip
ms_commit = `cd ms && git rev-parse HEAD`.strip
theme_commit = `cd .tmp && git rev-parse HEAD`.strip

Dir.mkdir('_data') unless Dir.exist? '_data'

file = File.new('_data/commits.json', 'w')
file.write(JSON.generate({ 'smokey' => smokey_commit, 'ms' => ms_commit, 'theme' => theme_commit },
  indent: "  ",
  object_nl: "\n",
  array_nl: "\n",
  space: " "
))
