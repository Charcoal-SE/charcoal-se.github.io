#!/usr/bin/env ruby

def jekyll_front_matter(path)
  repo_names = {
    "ms" => "metasmoke",
    "smokey" => "SmokeDetector"
  }
  m = ["---"]
  m << "layout: wiki"
  if path.include? "index.md"
    dir = "#{File.dirname path}"
    m << "permalink: #{dir}/"
    m << "redirect_from:"
    m << "- #{dir}/Home.html"
    m << "- #{dir}/Home"
    m << "- #{dir}"
    m << "title: Home"
  end
  m << "repo_name: #{repo_names[File.basename File.dirname path]}"
  m << "---"
  m << ""

  m.join "\n"
end

ARGV.reject { |path|
    path.include? "#{File::SEPARATOR}_"
  }.map { |path|
    [path, File.new(path,"r").read]
  }.each { |path, c|
    File.new(path, "w").write jekyll_front_matter(path) + c
  }
