#!/usr/bin/env ruby

def jekyll_front_matter(path)
  repo_names = {
    "ms" => "metasmoke",
    "smokey" => "SmokeDetector"
  }
  lines = []
  def l line
    lines << line

  l "---"
  l "layout: wiki"
  if path.include? "index.md"
    dir = "#{File.dirname path}"
    l "permalink: #{dir}/"
    l "redirect_from:"
    l "- #{dir}/Home.html"
    l "- #{dir}/Home"
    l "- #{dir}"
    l "title: Home"
  end
  l "repo_name: #{repo_names[File.basename File.dirname path]}"
  l "---"
  l ""

  lines.join "\n"
end

ARGV
  .reject { |path| path.include? "#{File::SEPARATOR}_" }
  .map { |path| [path, File.new(path,"r").read] }
  .each do |path, c|
    File.new(path, "w").write jekyll_front_matter(path) + c
  end
