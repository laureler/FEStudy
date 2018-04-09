/**
 * 通过比较ascii的值判断连续字符个数是否超过限制
 *
 * @param pwd
 *          密码字符串
 * @param count
 *          最多连续字符个数
 * @returns {boolean}
 *          连续字符个数大于等于count返回true,否则返回false
 */
function checkContinuousChar(pwd,count){
    if(!pwd || !count){
        return true;
    }
    if(count < 2){
        return true;
    }
    var preChar = 0;
    var reverseNum = 1;
    var sameCharNum = 1;
    var positiveNum = 1;
    for (var i = 0; i < pwd.length; i++) {
        var s = pwd.substring(i, i + 1);
        var c = s.charCodeAt(0);
        if (i === 0) {
            preChar = c;
        }else{
            /*if((c > 47 && c < 58 ) || (c > 64 && c < 91) || (c > 96 && c < 123)){*/
                //正连续
                if (c - 1 === preChar) {
                    positiveNum++;
                    if(positiveNum >= count){
                        return true;
                    }
                }else {
                    positiveNum = 1;
                }
                //反连续
                if (c + 1 === preChar) {
                    reverseNum++;
                    if(reverseNum >= count){
                        return true;
                    }
                }else {
                    reverseNum = 1;
                }
                //相同字符
                if (c === preChar) {
                    sameCharNum++;
                    if(sameCharNum >= count){
                        return true;
                    }
                }else {
                    sameCharNum = 1;
                }
           /* }else{
                reverseNum = 1;
                positiveNum = 1;
                sameCharNum = 1;
            }*/
            preChar = c;
        }
    }
    return false;
}

/**
 * 通过正则表达式验证字符串
 *
 * @param pwd
 *          密码字符串
 * @param regex
 *          正则表达式
 * @returns {boolean}
 *          验证结果
 */
function checkCharType(pwd,regex){
    if(!pwd || !regex){
        return false;
    }
    try {
        var re = new RegExp(regex);
        return re.test(pwd);
    }catch (e) {
        return false;
    }
}

/**
 * 根据验证类型验证密码
 *
 * @param pwd
 *          密码字符串
 * @param type
 *          密码类型（0-3）
 * @returns {boolean}
 *          验证结果
 */
function checkPwdByType(pwd,type) {
    if(!pwd){
        return false;
    }
    if(!type){
        return true;
    }
    var REG_TREE_TYPR_SIX_CHAR = "^(?![0-9a-z]+$)(?![0-9A-Z]+$)(?![0-9\\W]+$)(?![a-z\\W]+$)(?![a-zA-Z]+$)(?![A-Z\\W]+$)[a-zA-Z0-9\\W_]{6,}$";
    var REG_FORE_TYPR_EIGHT_CHAR = "[a-zA-Z0-9\\W_]{8,}$";
    var result = false;
    switch (type){
        case 1:
            if(pwd.length >= 6){
                result = true;
            }
            break;
        case 2:
            if(!checkContinuousChar(pwd,3)){
                result = checkCharType(pwd,REG_TREE_TYPR_SIX_CHAR);
            }
            break;
        case 3:
            if(!checkContinuousChar(pwd,3)){
                result = checkCharType(pwd,REG_FORE_TYPR_EIGHT_CHAR);
            }
            break;
    }
    return result;
}
