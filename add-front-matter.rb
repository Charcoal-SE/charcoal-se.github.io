#!/usr/bin/env ruby

def jekyll_front_matter(path, content)
  repo_names = {
    "ms" => "metasmoke",
    "smokey" => "SmokeDetector"
  }
  repo_name = repo_names[File.basename File.dirname path]

  title = File.basename(path, '.md').tr '-', ' '
  if title == 'Home' || title == 'index'
    title = repo_name
  end

  @lines = []
  def l line
    @lines << line
  end

  l "---"
  l "layout: wiki"
  if path.include? "index.md"
    dir = "#{File.dirname path}"
    l "permalink: #{dir}/"
    l "redirect_from:"
    l "- #{dir}/Home.html"
    l "- #{dir}/Home"
    l "title: Home"
  else
    l "title: #{title}"
  end
  l "repo_name: #{repo_name}"
  l "---"
  l ""

  if !(content[0] == '#' && content[1] != '#')
    l "# #{title}"
    l ""
  end
  l ""

  @lines.join "\n"
end

ARGV
  .reject { |path| path.include? "#{File::SEPARATOR}_" }
  .map { |path| [path, File.new(path,"r").read] }
  .each do |path, c|
    File.new(path, "w").write jekyll_front_matter(path, c) + c
  end
