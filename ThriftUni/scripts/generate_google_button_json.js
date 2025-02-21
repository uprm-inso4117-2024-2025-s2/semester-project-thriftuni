const fs = require('fs');
const path = require('path');

const platforms = ['android', 'ios', 'web'];
const scales = ['png@1x', 'png@2x', 'png@3x', 'png@4x'];
const themes = ['neutral', 'light', 'dark'];
const styles = ['rd_ctn', 'rd_na', 'rd_SI', 'rd_SU', 'sq_ctn', 'sq_na', 'sq_SI', 'sq_SU'];

const basePath = '../../assets/images/signin-assets';

const generateImageDictionary = () => {
    let output = 'const images = {\n';

    platforms.forEach(platform => {
        output += `    ${platform}: {\n`;

        themes.forEach(theme => {
            output += `        ${theme}: {\n`;

            scales.forEach(scale => {
                output += `            '${scale}': {\n`;

                styles.forEach(style => {
                    const filePath = `${basePath}/${platform}/${scale}/${theme}/${platform}_${theme}_${style}.png`;
                    output += `                ${style}: require('${filePath}'),\n`;
                });

                output += '            },\n';
            });

            output += '        },\n';
        });

        output += '    },\n';
    });

    output += '};\n\nexport default images;';

    return output;
};

// Guardar el diccionario generado en un archivo JS listo para usar
const outputFilePath = path.join(__dirname, 'imageDictionary.js');
fs.writeFileSync(outputFilePath, generateImageDictionary());

console.log('✅ Diccionario generado en imageDictionary.js');
