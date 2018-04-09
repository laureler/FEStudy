/*通用身份证读取(可根据不同类型，返回数据，格式都统一如下)
*/
;
//读取身份证信息的方法，需要对应表单中引入相应ActvieX控件(ocx)
//sIdCard：指定身份证读卡器产家类型
//  SynCardOcx：新中新
//  CVR_IDCard：华视
//  ZKTeco_CVR_IDCard：中控锐指
//  IdrControl1：精伦
//  EloamGlobal_ID：良田高拍仪
//  SD_IDCard：神盾
//返回读取结果，格式：
//"Fail|..."，表示失败，后接失败原因信息
//"Success|..."，表示成轼，后接读取的信息内容(多项之间以分号(;)隔开)：
//  姓名:??
//  性别:??
//  民族:??
//  出生:yyyy-mm-dd
//  地址:??
//  照片:
//  身份证号:??
//  有效期开始:yyyy-mm-dd
//  有效期结束:yyyy-mm-dd
//  发证机关:??
//  证件类型:身份证
function GetCardInfo(sIdCard) {
    var sResult = "Fail|暂不支持【" + sIdCard + "】型号读卡！";
    if (sIdCard == "CVR_IDCard") {
        sResult = GetCardInfoHS();
    }
    else if (sIdCard == "SynCardOcx") {
        sResult = GetCardInfoXZX();
    }
    else if (sIdCard == "ZKTeco_CVR_IDCard") {
        sResult = GetCardInfoZKTeco2();
    }
    else if (sIdCard == "IdrControl1") {
        sResult = GetCardInfoJLIDR();
    }
    else if (sIdCard == "EloamGlobal_ID") {
        sResult = GetCardInfoLT();
    }
    else if (sIdCard == "SD_IDCard") {
        sResult = GetSdCardInfo();
    }

    return sResult;
}

//新中新身份证读取
function GetCardInfoXZX() {
    var sResult = "Fail";
    var synCardOcx = document.getElementById("SynCardOcx");
    var str = synCardOcx.FindReader();
    if (str <= 0) {
        return sResult + "|读取端口失败！";
    }
    var nRet = synCardOcx.ReadCardMsg();
    if (nRet == 0) {
        sResult = "Success|";
        sResult += "姓名:" + synCardOcx.NameA + ";";
        sResult += "性别:" + synCardOcx.Sex + ";";
        sResult += "民族:" + synCardOcx.Nation + ";";
        sResult += "出生:" + synCardOcx.Born + ";";
        sResult += "地址:" + synCardOcx.Address + ";";
        sResult += "身份证号:" + synCardOcx.CardNo + ";";
        sResult += "有效期开始:" + synCardOcx.UserLifeB + ";";
        sResult += "有效期结束:" + synCardOcx.UserLifeE + ";";
        sResult += "发证机关:" + synCardOcx.Police + ";";
        sResult += "证件类型:身份证";
    }
    else {
        sResult += "|" + nRet.toString();
    }
    return sResult;
}

//华视身份证读取
function GetCardInfoHS() {
    var sResult = "Fail";
    var cvrIdCard = document.getElementById("CVR_IDCard");
    var sReadResult = cvrIdCard.ReadCard();
    if (sReadResult == "0") {
        sResult = "Success|";
        sResult += "姓名:" + cvrIdCard.Name + ";";
        sResult += "性别:" + cvrIdCard.Sex + ";";
        sResult += "民族:" + cvrIdCard.Nation + ";";
        sResult += "出生:" + cvrIdCard.Born + ";";
        sResult += "地址:" + cvrIdCard.Address + ";";
        sResult += "照片:" + cvrIdCard.Picture + ";";
        sResult += "身份证号:" + cvrIdCard.CardNo + ";";
        sResult += "有效期开始:" + cvrIdCard.EffectedDate + ";";
        sResult += "有效期结束:" + cvrIdCard.ExpiredDate + ";";
        sResult += "发证机关:" + cvrIdCard.IssuedAt + ";";
        sResult += "证件类型:身份证";
    }
    else {
        sResult += "|" + sReadResult;
    }
    return sResult;
}

//中控锐指读卡
function GetCardInfoZKTeco() {
    var cvrIdCard = document.getElementById("ZKTeco_CVR_IDCard");
    var cardReadInfo = { Success: false };
    var readerState = cvrIdCard.ListReaderCard();
    var strReadResult = cvrIdCard.ReadCard();
    var properties = ["Name", "Sex", "Nation", "Born", "Address", "CardNo", "IssuedAt", "EffectedDate", "ExpiredDate", "Picture"];
    var cardInfo = {};
    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];
        if (Object.prototype.hasOwnProperty.call(cvrIdCard, prop)) {
            var value = cvrIdCard[prop];
            cardInfo[prop] = value;
        }
    }
    cardReadInfo.CardInfo = cardInfo;
    if (strReadResult == "0") {
        cardReadInfo.Success = true;
        cardInfo.CardType = "身份证";
    } else {
        cardReadInfo.ErrorMessage = strReadResult;
    }
    return JSON.stringify(cardReadInfo);
}

//中控锐指读卡2
function GetCardInfoZKTeco2() {
    var sResult = "Fail";
    var cvrIdCard = document.getElementById("ZKTeco_CVR_IDCard");
    var readerState = cvrIdCard.ListReaderCard();
    var sReadResult = cvrIdCard.ReadCard();
    if (sReadResult == "0") {
        sResult = "Success|";
        sResult += "姓名:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "Name") ? cvrIdCard["Name"] : "" + ";";
        sResult += "性别:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "Sex") ? cvrIdCard["Sex"] : "" + ";";
        sResult += "民族:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "Nation") ? cvrIdCard["Nation"] : "" + ";";
        sResult += "出生:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "Born") ? cvrIdCard["Born"] : "" + ";";
        sResult += "地址:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "Address") ? cvrIdCard["Address"] : "" + ";";
        sResult += "照片:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "Picture") ? cvrIdCard["Picture"] : "" + ";";
        sResult += "身份证号:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "CardNo") ? cvrIdCard["CardNo"] : "" + ";";
        sResult += "有效期开始:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "EffectedDate") ? cvrIdCard["EffectedDate"] : "" + ";";
        sResult += "有效期结束:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "ExpiredDate") ? cvrIdCard["ExpiredDate"] : "" + ";";
        sResult += "发证机关:" + Object.prototype.hasOwnProperty.call(cvrIdCard, "IssuedAt") ? cvrIdCard["IssuedAt"] : "" + ";";
        sResult += "证件类型:身份证";
    }
    else {
        sResult += "|" + sReadResult;
    }
    return sResult;
}

//精伦读卡
function GetCardInfoJLIDR() {
    try {
        var sResult = "Fail|";
        var ax = new ActiveXObject("IDRCONTROL.IdrControlCtrl.1");
        var cvrIdCard = document.getElementById("IdrControl1");
        //注意：第一个参数为对应的设备端口，USB型为1001，串口型为1至16
        var result = cvrIdCard.ReadCard("1001", "");
        if (result == 1) {
            sResult = "Success|";
            sResult += "姓名:" + cvrIdCard.GetName() + ";";
            sResult += "性别:" + cvrIdCard.GetSex() + ";";
            sResult += "民族:" + cvrIdCard.GetFolk() + ";";
            sResult += "出生:" + cvrIdCard.GetBirthYear() + "-" + cvrIdCard.GetBirthMonth() + "-" + cvrIdCard.GetBirthDay() + ";";
            sResult += "地址:" + cvrIdCard.GetAddress() + ";";
            sResult += "照片:" + cvrIdCard.GetPhotobuf() + ";";
            sResult += "身份证号:" + cvrIdCard.GetCode() + ";";
            sResult += "有效日期:" + cvrIdCard.GetValid() + ";";
            sResult += "发证机关:" + cvrIdCard.GetAgency() + ";";
            sResult += "证件类型:身份证";
        }
        else {
            if (result == -1) {
                sResult += "端口初始化失败！";
            }
            else if (result == -2) {
                sResult += "请重新将卡片放到读卡器上！";
            }
            else if (result == -3) {
                sResult += "读取数据失败！";
            }
            else if (result == -4) {
                sResult += "请检查设定路径和磁盘空间！";
            }
            else {
                sResult += result.toString();
            }
        }
        return sResult;
    } catch (e) {
        return "Fail|控件未安装！";
    }
}

//获取神盾读卡器信息
function GetSdCardInfo() {
    var sResult = "Fail";
    var aaa = document.getElementById("SD_IDCard");
    var i = 0;
    var flag = 0;
    if (aaa.OpenComm(1001) == 1) {
        flag = 1;
    }
    else {
        for (i = 1; i < 3; i++) {
            if (aaa.OpenComm(i) == 1) {
                flag = 1;
                break;
            }
            if (flag != 1) {
                sResult += "|打开端口失败！";
            }
        }
    }

    if (flag == 1) {
        if (aaa.Authen() == 1) {
            ret = aaa.ReadCardPath("c:\\", 1);
            if (ret == 1 || ret == 3) {
                sResult = "Success|";
                sResult += "姓名:" + aaa.sName + ";";
                sResult += "性别:" + aaa.sSex + ";";
                sResult += "民族:" + aaa.sNation + ";";
                sResult += "出生:" + aaa.sBornDate + ";";
                sResult += "地址:" + aaa.sAddress + ";";
                sResult += "照片:" + ";";
                sResult += "身份证号:" + aaa.sIDNo + ";";
                sResult += "有效期开始:" + aaa.sStartDate + ";";
                sResult += "有效期结束:" + aaa.sEndDate + ";";
                sResult += "发证机关:" + aaa.sSignGov + ";";
                sResult += "证件类型:身份证";
            }
            else {
                sResult += "|读卡错误！";
            }
        }
        else {
            sResult += "|找卡错误,请重新放卡！";
        }
    }
    aaa.EndComm();
    return sResult;
}

//良田高拍仪读卡器
function GetCardInfoLT() {
    var sResult = "Fail";
    var eloamGlobal = document.getElementById("EloamGlobal_ID");
    if (eloamGlobal.InitIdCard()) {
        var ret = eloamGlobal.ReadIdCard();
        if (ret) {
            sResult = "Success|";
            sResult += "姓名:" + eloamGlobal.GetIdCardData(1) + ";";
            sResult += "性别:" + eloamGlobal.GetIdCardData(2) + ";";
            sResult += "民族:" + ";";
            sResult += "出生:" + eloamGlobal.GetIdCardData(4) + "-" + eloamGlobal.GetIdCardData(5) + "-" + eloamGlobal.GetIdCardData(6) + ";";
            sResult += "地址:" + eloamGlobal.GetIdCardData(7) + ";";
            sResult += "照片:" + ";";
            sResult += "身份证号:" + eloamGlobal.GetIdCardData(1) + ";";
            sResult += "有效期开始:" + eloamGlobal.GetIdCardData(10) + "-" + eloamGlobal.GetIdCardData(11) + "-" + eloamGlobal.GetIdCardData(12) + ";";
            sResult += "有效期结束:" + eloamGlobal.GetIdCardData(13) + "-" + eloamGlobal.GetIdCardData(14) + "-" + eloamGlobal.GetIdCardData(15) + ";";
            sResult += "发证机关:" + eloamGlobal.GetIdCardData(9) + ";";
            sResult += "证件类型:身份证";
        }
        else {
            sResult += "|读取二代证失败！";
        }
    }
    else {
        sResult += "|初始化二代证读取模块失败！";
    }
    return sResult;
}