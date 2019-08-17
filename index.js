const cmd = require('./cmd');
const file = require('./file');
// 提交185天前的记录
let day = 100;   //提交天数
let startDay = 0;   //距离今天多少天开始
const random = (lower, upper) => {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
const commit = async () => {
    const today = new Date();
    // 今天-起始时间-间距时间
    // 180天前-360天前的记录     前180-360
    // 最好每次不要超过180天
    today.setTime(today.getTime() - (startDay * 24 * 60 * 60 * 1000) - (day * 24 * 60 * 60 * 1000));
    let commitTime = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
    console.log(commitTime);
    let commitNumber = random(1, 10);   //提交次数
    while (commitNumber) {
        await file(commitTime);
        await cmd('git status');
        await cmd('git add .');
        await cmd(`git commit -m "${commitTime}" --no-edit --date="${commitTime}"`);
        commitNumber--;
    }
    if (day >= 0) {
        var randomDay = random(1, 3);    //1-2天的空档期,没有进行取整
        day = day - randomDay;   //每天都有提交
        commit();
    } else {
        await cmd('git push origin master');
    }
}
commit();


