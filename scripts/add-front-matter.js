const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const config = {
  "./docs/general": {
    defaultFrontMatter: {
      displayed_sidebar: "generalSidebar",
    },
    targetExtnames: [".md", ".mdx"],
  },
  "./docs/core": {
    defaultFrontMatter: {
      displayed_sidebar: "coreSidebar",
    },
    targetExtnames: [".md", ".mdx"],
  },
  "./docs/espace": {
    defaultFrontMatter: {
      displayed_sidebar: "eSpaceSidebar",
    },
    targetExtnames: [".md", ".mdx"],
  },
};

function addDefaultFrontMatter(directory, defaultFrontMatter, targetExtnames, dryRun) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isFile() && targetExtnames.includes(path.extname(file))) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);

      let modified = false;
      Object.keys(defaultFrontMatter).forEach(key => {
        if (!(key in parsed.data)) {
          parsed.data[key] = defaultFrontMatter[key];
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
      addDefaultFrontMatter(filePath, defaultFrontMatter, targetExtnames, dryRun); // Ensure dryRun is passed in recursive calls
    }
  });
}

// Check for --dryRun argument in the command line
const dryRun = process.argv.includes('--dryRun');

Object.keys(config).forEach((dir) => {
  console.log(dir)
  addDefaultFrontMatter(dir, config[dir].defaultFrontMatter, config[dir].targetExtnames, dryRun);
});
