function Validator(options) {
    var saveSelectorRule = {};
    function getParentElement(element, selector) {
       // console.log(element);
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            else {
                element = element.parentElement;
            }
        }
    }
    function Validate(formMessage, inputElement, rule) {
        var errorMessage; //= rule.test(inputElement.value);
        var rules = saveSelectorRule[rule.selector];

        for (var i = 0; i < rules.length; i++) {
            switch(inputElement.type) {
                case 'checkbox':

                    
                case 'radio':  
                    errorMessage = rules[i].test(formElement.querySelector(rule.selector + ":checked"));
                    break;
                default: errorMessage = rules[i].test(inputElement.value);
            }
            //console.log(rules[i].test());
            
            if (errorMessage) break;
        }
        if (errorMessage) {

            formMessage.innerText = errorMessage;
             getParentElement(inputElement, options.formGroupSeletor).classList.add('invalid');
        }
        else {
            formMessage.innerText = "";
             getParentElement(inputElement, options.formGroupSeletor).classList.remove('invalid');
        }
        console.log(!errorMessage)
        return !errorMessage; // convert thành boolen;

    }
    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isValidForm = true;
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
               
                    var formMessage = getParentElement(inputElement, options.formGroupSeletor).querySelector(options.formMessage);
                     var isValidRule = Validate(formMessage, inputElement, rule);
                if (!isValidRule) {
                    isValidForm = false;
                }
               
                

            });

            if (isValidForm) {
                if (typeof options.onSubmit === 'function') {

                    var enableInputs = formElement.querySelectorAll('[name]:not([disable])');

                    var formValues = Array.from(enableInputs); // convert enableInputs to array;
                    formValues = formValues.reduce(
                        function (values, input) {
                            switch (input.type) {
                                case 'checkbox': 
                                console.log([input.matches]);
                                if(input.matches(':checked')){
                                    if(Array.isArray(values[input.name])){
                                        values[input.name].push(input.value);
                                    }
                                    else{
                                        values[input.name] = [input.value];
                                    }
                                    
                                }
                                    
                                break;
                                case 'radio':
                                    if(input.matches(':checked')){
                                        values[input.name] = input.value;
                                    }

                                    
                                    break;
                                case 'file' :
                                    values[input.name] = input.files;
                                    break;
                                default: (values[input.name] = input.value);
                            }
                            
                            return values;
                        },
                        {});
                    options.onSubmit(
                        formValues
                    )
                }
                else {

                }
            }
            else {
                console.log('co loi')
            }
            // 

        }
        // Lặp qua các rule và handle
        options.rules.forEach(function (rule) {
            // lưu lại các rule
            if (Array.isArray(saveSelectorRule[rule.selector])) {
                saveSelectorRule[rule.selector].push(rule);
            } else {
                saveSelectorRule[rule.selector] = [rule];
            }



            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement) {
                var formMessage = getParentElement(inputElement, options.formGroupSeletor).querySelector(options.formMessage);

                if (inputElement) {
                    //Xử lý từng trường hợp blur khỏi input
                    inputElement.onblur = function () {
                        Validate(formMessage, inputElement, rule)
                    }
    
                    //Xử lý in đang nhập dữ liệu 
                    inputElement.oninput = function () {
                         getParentElement(inputElement, options.formGroupSeletor).classList.remove('invalid', true);
                        formMessage.innerText = '';
    
                    }
                }
            })  
            
        })
    }
}

// Define all rules
// - 1 : khi có error : return error
// - 2 : khong có error : không return anything
//- bắc buộc nhập
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) { // kiểm tra người dùng đã nhập chưa
            return value ? undefined : "Vui lòng nhập trường này!";
        }
    }
}
//- Email
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) { // Kiểm tra có phải là email không
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (regex.test(value)) {
                return undefined;
            }
            return "Trường này phải là email";
        }
    }
}
Validator.isMinLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) { // Kiểm tra có phải là email không

            if (value.length >= min) {
                return undefined;
            }
            return "Vui lòng nhập tối thiểu " + min + " Ký tự";
        }
    }
}
Validator.isConfirm = function (selector, getvalidValue, messageError) {
    return {
        selector: selector,
        test: function (value) { // Kiểm tra có phải là email không

            if (value === getvalidValue()) {
                return undefined;
            }
            return messageError || "Giá trị nhập vào không chính xác ";
        }
    }
}