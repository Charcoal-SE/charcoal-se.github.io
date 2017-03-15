#!/usr/bin/env ruby
repo_names = {
  "ms" => "metasmoke",
  "smokey" => "SmokeDetector"
}
ARGV.reject{ |path| path.include?"#{File::SEPARATOR}_" }
    .map{ |path| [path, File.new(path,"r").read] }
    .each{ |path,c|
      File.new(path,"w").write"---\nlayout: wiki\n" + (path.include?("index.md") ? "redirect_from:\n- /#{File.dirname path}/Home.html\n- /#{File.dirname path}/Home\n" : "") + "repo_name: #{repo_names[File.basename File.dirname path]}\n---\n\n"+c }
