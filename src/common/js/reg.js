//
function reg1(obj) {
    return {
        name: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" }
        ],
        tel: [{
            validator: (rule, value, callback) => {
                if (!value) {
                    callback(new Error("手机号不能为空"));
                } else {
                    if (/^1[34578]{1}\d{9}$/.test(value) == false) {
                        callback(new Error("请输入正确的手机号"));
                    } else {
                        callback();
                    }
                }
            }, trigger: "blur"
        }
        ],
        pass: [{
            validator: (rule, value, callback) => {
                if (/^(?=.*[a-z])(?=.*\d)[^]{6,}$/.test(value) == false) {
                    callback(new Error("请输入至少6位以上的密码，必须包含小写字母和数字"));
                } else {
                    callback();
                }
            },
            trigger: "blur"
        }],
        confirm: [{
            validator: (rule, value, callback) => {
                console.log(obj.user.pass);
                if (/^(?=.*[a-z])(?=.*\d)[^]{6,}$/.test(value) == false) {
                    callback(new Error("请输入至少6位以上的密码，必须包含小写字母和数字"));
                } else if (value !== obj.user.pass) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            },
            trigger: "blur"
        }],
        email: [
            { required: true, message: "请输入邮箱地址", trigger: "blur" },
            {
                type: "email",
                message: "请输入正确的邮箱地址",
                trigger: ["blur", "change"]
            }
        ],
        idx: [
            { required: true, message: "请输入身份证号", trigger: "blur" },
            {
                pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                message: "你的身份证格式不正确"
            }
        ],
        prop: [
            { required: true, message: "备注不能为空", trigger: "blur" },
            { min: 2, max: 7, message: "长度在 2 到 20 个字符" }
        ],
        des: [
            { required: true, message: "备注不能为空", trigger: "blur" },
            { min: 2, max: 7, message: "长度在 2 到 20 个字符" }
        ]


    }
}




export default reg1