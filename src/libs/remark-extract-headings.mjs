export function remarkExtractHeadings() {
  return (tree, file) => {
    const headings = [];

    const extractHeadings = (nodes) => {
      for (const node of nodes) {
        if (node.type === 'heading' && (node.depth === 2 || node.depth === 3)) {
          const text = node.children
            .filter(child => child.type === 'text')
            .map(child => child.value)
            .join('')
            .trim();

          const slug = node.data?.id || text.toLowerCase().replace(/\s+/g, '-');

          headings.push({ depth: node.depth, slug, text });
        }

        if (node.children) {
          extractHeadings(node.children);
        }
      }
    };

    extractHeadings(tree.children);

    // Check if the `file.data.astro` structure exists
    if (file.data && file.data.astro) {
      file.data.astro.frontmatter.customHeadings = headings;
    } else {
      console.error('File structure is incorrect. No astro data available.');
    }
  };
}
