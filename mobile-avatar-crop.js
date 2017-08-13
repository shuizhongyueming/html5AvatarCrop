/**
 * 第一目标是为了满足手机端头像裁剪需求
 *
 * 主要分如下几个功能点：
 * 1. 本地的基于HTML5 FileApi的图像预览功能
 * 2. 图像选择功能
 *    a. 选择框移动
 *    b. 选择框放大缩小
 *    c. 确定选择/取消选择
 * 3. 图像裁剪
 * 4. 图像上传
 */
import './mobile-avatar-crop.less';
// const Draggabilly = require('draggabilly');
import Draggabilly from 'draggabilly';

/**
 * 获取图片数据
 *
 * @param {DOM} domInputFile fileInput
 * @returns {Promise} 返回对应的dataUrl
 */
function getImgDataUrl(domInputFile){
    return new Promise(function(resolve, reject){
        let fileList = domInputFile.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(fileList);
        fileReader.onload = function(fileEvent){
            resolve(fileEvent.target.result);
        };
    });
}
function str2Fragment(str) {
    var temp = document.createElement('template');
    temp.innerHTML = str;
    return temp.content;
}
function findRole(dom, role){
    return dom.querySelectorAll('[data-role="'+role+'"]');
}
function createHtml(data){
    let tpl = `
        <div id="J-mobile-avatar-crop">
            <div data-role="img-wrap">
                <div data-role="img-cont">
                    <img src="${data.url}">
                    <div data-role="cropper">
                        <div data-role="scal-top-left"></div>
                        <div data-role="scal-top-right"></div>
                        <div data-role="scal-bottom-left"></div>
                        <div data-role="scal-bottom-left"></div>
                    </div>
                </div>
            </div>
            <div data-role="select">
                <div data-role="cancel">${data.txtCancel}</div>
                <div data-role="ok">${data.txtOk}</div>
            </div>
        </div>`;

    let frag = str2Fragment(tpl);

    document.body.appendChild(frag);
}

function initCropperEvent({ domCrop, domCropper, domImgWrap, domImgCont, domBtnOk, domBtnCancel, isImgOut }, cb) {

    let closePop = () => {
        document.body.removeChild(domCrop);
    };

    domBtnOk.addEventListener('click', () => {
        closePop();
        cb()
    }, false);

    domBtnCancel.addEventListener('click', () => {
        closePop();
        cb(false);
    }, false);

    // 托拽的时候，如果domImg尺寸超过domImgWrap，则托拽限制在domImgWrap内
    // 反之，限制在domImgCont内
    // 这样避免托拽超出
    let draggie = new Draggabilly(domCropper, {
        containment: domImgCont 
    })
}

/**
 * 校正图片对齐
 *
 * @param {DOM} domImgWrap data-role=img-wrap
 * @param {DOM} domImg img标签
 */
function fixImgAlign(domImgWrap, domImg) {
    return new Promise(function(resolve, reject){
        let imgHeight = domImg.clientHeight;
        let wrapHeight = domImgWrap.clientHeight;
        const classFull = 'full';

        // 针对溢出的图片的定位校正
        if (imgHeight === 0) {
            domImg.addEventListener('load', function(){
                imgHeight = domImg.clientHeight;

                if (imgHeight >= wrapHeight) {
                    domImgWrap.classList.add(classFull);
                    resolve(true)
                }
                resolve(false);
            }, false);
        } else {
            if (imgHeight >= wrapHeight) {
                domImgWrap.classList.add(classFull);
                resolve(true);
            }
        }
        resolve(false);
    });
}

function initCropperPop(url, cb){
    const templateData = {
        url: url,
        txtCancel: '取消',
        txtOk: '确认'
    };
    const cropData = {
        top: 0,
        left: 0,
        width: 100,
        height: 100
    };

    createHtml(templateData);

    let domCrop = document.getElementById('J-mobile-avatar-crop'),
        domImgWrap = findRole(domCrop, 'img-wrap')[0],
        domImgCont = findRole(domImgWrap, 'img-cont')[0],
        domImg = domImgWrap.querySelector('img'),
        domCropper = findRole(domImgWrap, 'cropper')[0],
        domBtnCancel = findRole(domCrop, 'cancel')[0],
        domBtnOk = findRole(domCrop, 'ok')[0];

    fixImgAlign(domImgWrap, domImg).then(function(isImgOut){
        initCropperEvent({
            domCrop,
            domImgWrap,
            domImgCont,
            domCropper,
            domBtnOk,
            domBtnCancel,
            isImgOut
        }, cb);
    });


}

function mobileAvatarCroper(domInputFile, cb) {
    domInputFile.addEventListener('change', () => {
        getImgDataUrl(domInputFile).then((dataUrl) => {
            initCropperPop(dataUrl, cb);
            domInputFile.value = ""; // 清空
        })
    }, false);
}

export default mobileAvatarCroper;