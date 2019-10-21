"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "apicontroller" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.apicontroller', () => {
        // The code you place here will be executed every time your command is executed
        vscode.window.showInputBox({ ignoreFocusOut: true, prompt: 'Digite o nome da classe de modelo', value: 'new' + +'.cs' })
            .then((newfilename) => {
            if (typeof newfilename === 'undefined') {
                return;
            }
            if (!newfilename.endsWith('.cs')) {
                newfilename += '.cs';
            }
            var newfilepath = './' + newfilename;
            openTemplateAndSaveNewFile(newfilename.replace('.cs', ''));
        });
        // Display a message box to the user
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function openTemplateAndSaveNewFile(ModelName) {
    var path = require('path');
    var fs = require('fs');
    var ClassName = ModelName + 'sController';
    var namespace = "";
    var a = __dirname;
    var arrayOfStrings = a.split('\\');
    if (arrayOfStrings.length > 1) {
        namespace = arrayOfStrings[arrayOfStrings.length - 2];
    }
    var templateText = fs.readFileSync(path.resolve(__dirname, 'template.tmpl'), 'utf8');
    templateText = templateText.replace(/#{namespace}/g, namespace);
    templateText = templateText.replace(/#{classname}/g, ClassName);
    templateText = templateText.replace(/#{modelname}/g, ModelName);
    fs.writeFile(path.resolve(__dirname, ClassName + '.cs'), templateText, function (erro) {
        if (erro) {
            throw erro;
        }
        vscode.window.showInformationMessage('Classe ' + ClassName + ' criada com sucesso');
        vscode.workspace.openTextDocument(path.resolve(__dirname, ClassName + '.cs')).then((doc) => {
            vscode.window.showTextDocument(doc).then((editor) => {
            });
        });
    });
    /*
      let templatefileName = 'template.tmpl';
      let mathExt : any = vscode.extensions.getExtension('TiagoSouza.apicontroller');
      let caminho: string = 'C:\Fontes\extensoes\ControllerExtension\apicontroller\template.tmpl';
  
      vscode.workspace.openTextDocument(path.resolve(__dirname, ModelName+'.cs'))
          .then((doc: vscode.TextDocument) => {
              let text = doc.getText();
              text = text.replace('${namespace}', namespace);
              text = text.replace('${classname}', ModelName);
  
  
              vscode.workspace.openTextDocument(caminho).then((doc) => {
                  vscode.window.showTextDocument(doc).then((editor) => {
                      
                  });
              });
          });  */
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map