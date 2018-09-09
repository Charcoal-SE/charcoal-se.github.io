#!/usr/bin/env ruby

require 'json'

smokey_commit = `git -C ./smokey rev-parse HEAD`.strip
ms_commit = `git -C ./ms rev-parse HEAD`.strip

Dir.mkdir('_data') unless Dir.exist? '_data'

File.open '_data/commits.json', 'w' do |f|
  f.write(JSON.generate({ 'smokey' => smokey_commit, 'ms' => ms_commit },
    indent: "  ",
    object_nl: "\n",
    array_nl: "\n",
    space: " "
  ))
end
