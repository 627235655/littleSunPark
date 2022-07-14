App({
  async onLaunch() {
    this.initCloud()

    this.globalData = {
      //记录使用者的openid
      _openidA: 'onsgK5XqCMLbYXudVgh3xjV4kgWw',
      _openidB: 'onsgK5Zc7t-bFdnFk3_krqdIRZYY',

      //记录使用者的名字
      userA: '☀️',
      userB: '🕊',

      //用于存储待办记录的集合名称
      collectionMissionList: 'MissionList',
      collectionMarketList: 'MarketList',
      collectionStorageList: 'StorageList',
      collectionUserList: 'UserList',

      //最多单次交易积分
      maxCredit: 500,
    }
  },

  flag: false,

  /**
   * 初始化云开发环境
   */
  async initCloud() {
    const normalInfo = require('./envList.js').envList || [] // 读取 envlist 文件
    if (normalInfo.length != 0 && normalInfo[0].envId != null) { // 如果文件中 envlist 存在
      wx.cloud.init({ // 初始化云开发环境
        traceUser: true,
        env: normalInfo[0].envId
      })
      // 装载云函数操作对象返回方法
      this.cloud = () => {
        return wx.cloud // 直接返回 wx.cloud
      }
    } else { // 如果文件中 envlist 不存在，提示要配置环境
      this.cloud = () => {
        wx.showModal({
          content: '无云开发环境',
          showCancel: false
        })
        throw new Error('无云开发环境')
      }
    }
  },

  // 获取云数据库实例
  async database() {
    return (await this.cloud()).database()
  },
})