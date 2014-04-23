# siyuan

An SNS backend framework, with Node and MySQL

## Screenshots

<img width="170" src="screenshots/Screenshot_2014-03-22-23-21-48.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-22-01.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-22-10.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-22-37.jpeg">

<img width="170" src="screenshots/Screenshot_2014-03-22-23-23-00.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-23-08.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-23-14.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-23-36.jpeg">

<img width="170" src="screenshots/Screenshot_2014-03-22-23-24-02.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-24-57.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-25-13.jpeg">
&nbsp;
<img width="170" src="screenshots/Screenshot_2014-03-22-23-26-09.jpeg">
&nbsp;

## Install

1. Install Node and MySQL

1. Download or clone the repository

	```sh
	git clone git@github.com:node-fun/siyuan.git
	cd siyuan
	```

1. Install dependencies

	```sh
	npm install -d
	```

1. Copy the `config`, and modify as you need

	```sh
	cp -r config.default config
	```

1. Setup the database

	```sh
	node setup [environment]
	```

	Usually, environment could be either `development`(default) or `production`.<br>
	Testing records come with a development mode.

## Run

```sh
node . [environment]
```

## Test

```sh
npm test
```
