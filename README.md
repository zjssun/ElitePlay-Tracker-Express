# ElitePlayTracker-Express

## 介绍 Introduction

这是一个Elite Play Tracker网站的后端。
This is the backend of an Elite Play Tracker website.

**API**
| 端点 | 描述 |
| ---- | ---- |
| GET /getmatch/all | 获取所有比赛信息 |
| GET /getmatch/{player} | 获取指定玩家的比赛信息 |
| POST /getplayer/matchTime | 获取指定时间段内的玩家信息 |

| Endpoints | Description |
| ---- | ---- |
| GET /getmatch/all | Get all the game information |
| GET /getmatch/{player} | Get the match information for the specified player |
| POST /getplayer/matchTime | Get player information for a specified period of time |

## 安装 Installation
**1.克隆仓库 Clone the repository:**

```js
git clone https://github.com/zjssun/ElitePlay-Tracker-Express.git
```
**2.导入数据库表结构 Import the database table structure:**

把根目录的[eptracker.sql](https://github.com/zjssun/ElitePlay-Tracker-Express/blob/master/eptracker.sql)导入到你的MySQL数据库的表中。
Import the root [eptracker.sql](https://github.com/zjssun/ElitePlay-Tracker-Express/blob/master/eptracker.sql) directory into a table in your MySQL database.

**3.进入项目目录 Enter the project directory:**

```js
cd ElitePlay-Tracker-Express/
```

**4.安装依赖 Install dependencies:**

```js
npm install
```
**5.编辑数据库配置文件 Edit the database configuration file:**

打开根目录的[Connect.js](https://github.com/zjssun/ElitePlay-Tracker-Express/blob/master/mysql/Connect.js)文件，编辑数据库配置。

```js
const pool = mysql.createPool({
    host: "127.0.0.1",//数据库地址
    user: "root",//用户名
    password: '',//密码
    database: "eptracker",//数据库名
    //port: 3306,默认端口号
    waitForConnections: true,
    connectionLimit: 10,
})
```

**6.启动服务 Start the service:**

```js
node index
```
