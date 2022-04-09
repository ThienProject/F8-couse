function Validator(formSelector) {
    var _this = this;
    function getParentElement(element, selector) {
        return element.closest(selector);
    }
    var formRules = {};

    var validatorRules = {
        required: function (inputValue) {
            return inputValue != '' ? undefined : "Vui lòng nhập trường này!";
        },
        email: function (inputValue) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(inputValue) ? undefined : "Trường này phải là email!";
        },
        min: function (minLength) {
            return function (inputValue) {
                inputValue.length >= minLength ? undefined : "Trường này phải chứa ít nhất " + minLength + " ký tự";
            }
        },
        max: function (maxLength) {
            return function (inputValue) {
                inputValue.length <= maxLength ? undefined : "Trường này phải chứa tối đa " + maxLength + " ký tự";
            }
        },
    };
    var formElement = document.querySelector(formSelector);
    var inputs = formElement.querySelectorAll('[rules][name]');

    if (formElement) {

        inputs.forEach(function (input) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleDetail;
                var isRuleHasDetail = rule.includes(":");
                if (isRuleHasDetail) {
                    ruleDetail = rule.split(':');
                    rule = ruleDetail[0];

                }
                var ruleFunc = validatorRules[rule];
                if (isRuleHasDetail) {
                    // nếu như có dấu : thì chạy hàm min truyền tham số min(ruleDetail) vào 
                    ruleFunc = validatorRules[rule](ruleDetail[1]);
                    // console.log((ruleDetail[1]));
                }
                if (Array.isArray(formRules[input.name])) {

                    formRules[input.name].push(ruleFunc);
                    // console.log(formRules);
                }
                else {
                    formRules[input.name] = [ruleFunc];
                }
            }
            // Listen event to handle (blur, onchange, oninput...)
            var parentElement = getParentElement(input, '.form-group');
            var messageElement = parentElement.querySelector(`.form-message`);

            input.onblur = handleValidate;
            input.oninput = handleClearValidate;

            function handleClearValidate() {
                if (parentElement.classList.contains('invalid')) {
                    parentElement.classList.remove('invalid');
                    messageElement.innerText = '';
                }


            }


        })
        function handleValidate(event) {

            /// console.log(formRules)
            var inputValue = event.target.value;
            var errorMessage;
            for (rule of formRules[event.target.name]) {

                if (rule(inputValue)) {
                    errorMessage = rule(inputValue);
                    break;
                }

            }
            if (errorMessage) {
                parentElement = event.target.closest('.form-group');
                var messageElement = parentElement.querySelector(`.form-message`);
                messageElement.innerText = errorMessage;
                parentElement.classList.add('invalid');
            }
            return !errorMessage;
            // formRules
        }

        formElement.onsubmit = function (event) {
            var isValidAll = true;

            event.preventDefault();
            inputs.forEach(function (input) {
                // tự tạo biến event chứa target
                event_custom = { target: input };
                var isinputValid = handleValidate(event_custom);
                if (!isinputValid) {
                    isValidAll = false;
                }
            })
            if (isValidAll) {

                if (typeof _this.onSubmit === 'function') {
                    var inputEnable = formElement.querySelectorAll('[name]');
                    var formValue = Array.from(inputEnable).reduce(function (values, input) {
                        switch (input.type) {
                            case 'radio':
                                if (input.matches(':checked')) {
                                    values[input.name] = input.value;
                                }
                                break;
                            case 'checkbox':
                                if (input.checked /* hoặc dùng input.matches(':checked') */) {
                                    if (Array.isArray(values[input.name])) {
                                        values[input.name].push(input.value);
                                    }
                                    else {
                                        values[input.name] = [input.value];
                                    }
                                }
                                break;
                            case 'file':
                                values[input.value] = input.file;
                                break;
                            default: values[input.name] = input.value;
                        }

                        return values;
                    }, {})
                    _this.onSubmit(formValue);
                } else {
                    formElement.submit();
                }

            }
        }


    }

}