//自己首页刷新后执行获取自己的userId
Array.from(document.getElementsByTagName('script')).forEach(function (item) {
  // console.log(item)
  let text = item.textContent || item.innerText
  if (text.indexOf('window.__APOLLO_STATE__') !== -1) {
    const strs = text.split('=')[1]
    const root = JSON.parse(strs)
    const userRef = root.ROOT_QUERY.viewer.__ref
    console.log(userRef.split(':')[1])
  }
})

// 发送关注请求
var url = 'https://medium.com/_/graphql'
const users = [
  '7cc5521e5d2b',
  'db62fd5340d3',
  '6fa6024336af',
  '4a9af0a2970e',
  'b38bcbdbf4f3',
  'b92d4558e295',
  '7030f4727f69',
  '713a0b213a63',
  '8053b1081bca',
  'd0f399f9c412',
  'c0d1c27146b9',
  '199420958b5',
  '6102c7a0c8de',
  '7997dc0811c6',
  '2c8397c4af9e',
  '77c6cf9cd356',
  '9e0e84b91ee7',
  '308423cc9481',
  '5c5df4af151a',
  'd88028c4bde4',
  '16f4fadefd59',
  '3101f6d59fbf',
  '3acbb9e7c166',
  '22dd77d62d59',
  '9b56df344c3',
  '116d9bd4d821',
  '24f804e08ed7',
  '3f638ffc4c6',
  'a2b893981e8a',
  '75d8b5a6a2c0',
  '9b0266167a3e',
  'ba684e55d13a'
] //将需要关注的userId添加进去

const sendPromise = (uid) => new Promise((resolve, reject) => {
  var params = [
    {
      "operationName": "FollowUser",
      "variables": {
        "targetUserId": uid
      },
      "query": "mutation FollowUser($targetUserId: ID!) {\n  followUser(targetUserId: $targetUserId) {\n    __typename\n    id\n    viewerEdge {\n      __typename\n      id\n      isFollowing\n    }\n  }\n}\n"
    }
  ]
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        return resolve(xhr.responseText)
      } else {
        return reject(xhr.statusText)
      }
    }
  };
  xhr.onerror = function (e) {
    return reject(xhr.statusText)
  };
  xhr.send(JSON.stringify(params));
})

const sendUsers = async () => {
  for (let i = 0; i < users.length; i++) {
    const result = await sendPromise(users[i])
    console.log(result)
  }
  console.log('end')
}
sendUsers()
