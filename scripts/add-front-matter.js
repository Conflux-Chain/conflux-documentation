const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const config = {
  defaultFrontMatter: {
    displayed_sidebar: 'allSidebar'
  },
  targetExtnames: ['.md', '.mdx'],
  targetDir: ["./docs"]
}

function addDefaultFrontMatter(directory, defaultOptions, dryRun) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isFile() && config.targetExtnames.includes(path.extname(file))) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);

      let modified = false;
      Object.keys(defaultOptions).forEach(key => {
        if (!(key in parsed.data)) {
          parsed.data[key] = defaultOptions[key];
          modified = true;
        }
      });

      if (modified) {
        const newContent = matter.stringify(parsed.content, parsed.data);
        if (!dryRun) {
          fs.writeFileSync(filePath, newContent);
        }
        console.log(`Updated front matter for ${filePath}`);
      }
    } else if (fileStats.isDirectory()) {
      addDefaultFrontMatter(filePath, defaultOptions, dryRun); // Ensure dryRun is passed in recursive calls
    }
  });
}

// Check for --dryRun argument in the command line
const dryRun = process.argv.includes('--dryRun');

config.targetDir.forEach((dir) => {
  addDefaultFrontMatter(dir, config.defaultFrontMatter, dryRun);
});
