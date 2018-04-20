var fs=require("fs");
var path=require("path");

var param={
	name:process.argv[2]
}
var htmlTpl=`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
	<title>${param.name}</title>
	<link rel="stylesheet" href="css/index.css">
</head>
<body>
	<script src="js/index.js"></script>
</body>
</html>`;

// 创建项目文件夹
var app={
	createProject:(dirname)=> {
		let _path=fs.existsSync(path.join(__dirname+'/../src',dirname))
		if(!_path){
			fs.mkdirSync('src/'+dirname);
			console.log("创建成功")
			app.initFile('src/'+dirname)
		}else{
			console.log("指定的项目名称已存在")
		}
	},
	//初始化文件
	initFile:(filepath)=> {
		fs.mkdirSync(filepath+'/css');
		fs.mkdirSync(filepath+'/js');

		fs.writeFileSync(filepath+'/index.html',htmlTpl)
		fs.writeFileSync(filepath+'/css/index.css','')
		fs.writeFileSync(filepath+'/js/index.js','')
	}
}
app.createProject(param.name)