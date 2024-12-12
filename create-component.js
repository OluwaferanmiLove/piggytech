#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Helper function to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Helper function to generate component template
function generateComponentTemplate(componentName) {
  return `import React from 'react';
import { View, Text } from 'react-native';

interface ${componentName}Props {
  // Add your props here
}

const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <View>
      <Text>${componentName} Component</Text>
    </View>
  );
};

export default ${componentName};
`;
}

// Function to update parent index.ts files recursively
function updateParentIndexFiles(fullPath, baseDirectory) {
  // Split the path relative to the base directory
  const relativePath = path.relative(path.join(process.cwd(), baseDirectory), fullPath);
  const pathParts = relativePath.split(path.sep);

  // Remove the filename from path parts
  pathParts.pop();

  // Iterate through parent directories
  for (let i = 0; i < pathParts.length; i++) {
    // Construct the current parent directory path
    const parentPath = path.join(process.cwd(), baseDirectory, ...pathParts.slice(0, i + 1));
    const parentIndexPath = path.join(parentPath, 'index.ts');

    // Get the folder name to export
    const folderName = pathParts[i];

    // Read existing index content
    let indexContent = '';
    try {
      indexContent = fs.existsSync(parentIndexPath) 
        ? fs.readFileSync(parentIndexPath, 'utf8') 
        : '';
    } catch (error) {
      console.log(`Creating new index file: ${parentIndexPath}`);
    }

    // Create export statement
    const exportStatement = `export * from './${folderName}';\n`;
    
    // Add export if not already exists
    if (!indexContent.includes(exportStatement)) {
      fs.writeFileSync(parentIndexPath, indexContent + exportStatement);
      console.log(`Updated parent index: ${parentIndexPath}`);
    }
  }
}

// Main function to create component
function createComponent(relativePath) {
  // Validate input
  if (!relativePath) {
    console.error('Please provide a relative path for the component');
    process.exit(1);
  }

  // Determine base directories
  const baseDirectories = ['src/components', 'src/screens'];
  let targetDirectory = null;
  let baseDirectory = null;

  // Find the correct base directory
  for (const dir of baseDirectories) {
    const possibleFullPath = path.join(process.cwd(), dir, relativePath);
    const possibleDirectory = path.dirname(possibleFullPath);
    
    // Check if the directory structure might exist
    if (!fs.existsSync(possibleDirectory)) {
      // If directory doesn't exist, use the first part of relativePath 
      // to determine which base directory to use
      const firstPart = relativePath.split('/')[0];
      if (firstPart === 'components' || firstPart === 'screens') {
        baseDirectory = `src/${firstPart}`;
        // Remove the first part from relativePath
        relativePath = relativePath.split('/').slice(1).join('/');
      }
    }

    // If we found a base directory, construct full path
    if (baseDirectory) {
      targetDirectory = path.join(process.cwd(), baseDirectory, relativePath);
      break;
    }
  }

  // If no directory found, use src/components as default
  if (!targetDirectory) {
    baseDirectory = 'src/components';
    targetDirectory = path.join(process.cwd(), baseDirectory, relativePath);
  }

  // Ensure directory exists
  const directory = path.dirname(targetDirectory);
  fs.mkdirSync(directory, { recursive: true });

  // Get component name details
  const fileName = path.basename(targetDirectory);
  const componentName = toPascalCase(fileName);
  const componentPath = `${targetDirectory}.tsx`;

  // Create component file
  fs.writeFileSync(componentPath, generateComponentTemplate(componentName));
  console.log(`Created component: ${componentPath}`);

  // Find and update index.ts for the specific subdirectory
  const subfolderIndexPath = path.join(directory, 'index.ts');
  
  // Update subdirectory index.ts
  let subfolderIndexContent = '';
  try {
    subfolderIndexContent = fs.existsSync(subfolderIndexPath) 
      ? fs.readFileSync(subfolderIndexPath, 'utf8') 
      : '';
  } catch (error) {
    console.log(`Creating new subdirectory index file: ${subfolderIndexPath}`);
  }

  const subfolderImportStatement = `export { default as ${componentName} } from './${fileName}';\n`;
  
  // Append import to subdirectory index if not already exists
  if (!subfolderIndexContent.includes(subfolderImportStatement)) {
    fs.writeFileSync(subfolderIndexPath, subfolderIndexContent + subfolderImportStatement);
    console.log(`Updated subdirectory index: ${subfolderIndexPath}`);
  }

  // Update parent index files recursively
  updateParentIndexFiles(directory, baseDirectory);

  console.log('Component creation complete!');
}

// Run the script
createComponent(process.argv[2]);