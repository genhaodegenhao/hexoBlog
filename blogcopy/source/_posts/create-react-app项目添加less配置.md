---
title: create-react-app项目添加less配置
date: 2017-08-10 17:32:40
tags:
---
使用create-react-app 创建的项目默认不支持less，以下增加less配置的步骤

#### 暴露配置文件

create-react-app生成的项目文，看不到webpack相关的配置文件，需要先暴露出来，使用如下命令即可：

	npm run eject

安装less-loader 和 less

	npm install less-loader less --save-dev

#### 修改webpack配置

修改 webpack.config.dev.js 和 webpack.config-prod.js 配置文件

##### 改动1：

/\.css$/ 改为 /\.(css|less)$/, 修改后如下：

	exclude: [
	  /\.html$/,
	  /\.(js|jsx)$/,
	  /\.(css|less)$/,
	  /\.json$/,
	  /\.bmp$/,
	  /\.gif$/,
	  /\.jpe?g$/,
	  /\.png$/,
	],

##### 改动2：

test: /\.css$/ 改为 /\.(css|less)$/

test: /\.css$/ 的 use 数组配置增加 less-loader

修改后如下：

	{
	  test: /\.(css|less)$/,
	  use: [
	    require.resolve('style-loader'),
	    {
	      loader: require.resolve('css-loader'),
	      options: {
	        importLoaders: 1,
	      },
	    },
	    {
	      loader: require.resolve('postcss-loader'),
	      options: {
	        // Necessary for external CSS imports to work
	        // https://github.com/facebookincubator/create-react-app/issues/2677
	        ident: 'postcss',
	        plugins: () => [
	          require('postcss-flexbugs-fixes'),
	          autoprefixer({
	            browsers: [
	              '>1%',
	              'last 4 versions',
	              'Firefox ESR',
	              'not ie < 9', // React doesn't support IE8 anyway
	            ],
	            flexbox: 'no-2009',
	          }),
	        ],
	      },
	    },
	    {
	      loader: require.resolve('less-loader') // compiles Less to CSS
	    }
	  ],
	},