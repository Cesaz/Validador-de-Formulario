let Validador = {
    handleSubmit:(event)=>{
        event.preventDefault(); // Impede o envio padrão do formulário - (Prevents the default form submission)

        let send = true; // Variável para controlar o envio do formulário - (Variable to control form submission)
        let inputs = form.querySelectorAll('input'); // Seleciona todos os inputs dentro do formulário - (Selects all inputs within the form)

        Validador.clearErrors(); // Limpa os erros de validação existentes - (Clears existing validation errors)

        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = Validador.checkInput(input); // Executa a validação do input - (Performs input validation)

            if(check !== true) {
                send = false; // Define send como falso para impedir o envio do formulário - (Set send to false to prevent form submission)
                Validador.showError(input, check); // Exibe o erro no input - (Displays the error on the input)
            }
        }

        if(send) {
            form.submit(); // Submete o formulário - (Submits the form)
        }
    },

    checkInput:(input) => {
        let rules = input.getAttribute('data-rules'); // Obtém as regras de validação definidas para o input - (Retrieves the validation rules defined for the input)

        if (rules !== null) {
            rules = rules.split('|'); // Divide as regras em um array - (Splits the rules into an array)
            for (let k in rules) {
                let rulesDetails = rules[k].split('='); // Divide os detalhes da regra em um array - (Splits the rule details into an array)
                switch (rulesDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio.'; // Retorna uma mensagem de erro se o campo estiver vazio - (Returns an error message if the field is empty)
                        }
                    break;
                    
                    case 'min':
                        if(input.value.length < rulesDetails[1]) {
                            return 'Campo tem que ter pelo menos ' + rulesDetails[1] + ' caracteres'; // Retorna uma mensagem de erro se o campo tiver menos caracteres do que o especificado - (Returns an error message if the field has fewer characters than specified)
                        }
                    break;
                    
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido'; // Retorna uma mensagem de erro se o formato do e-mail for inválido - (Returns an error message if the email format is invalid)
                            }
                        }
                    break;
                }
            }
        }
        return true; // Retorna true se a validação for bem-sucedida - (Returns true if validation is successful)
    },

    showError:(input, error) => {
        input.style.borderColor = '#FF0000'; // Define a cor da borda como vermelha para indicar um erro no input - (Sets the border color to red to indicate an error in the input)

        let errorElement = document.createElement('div'); // Cria um elemento div para exibir a mensagem de erro - (Creates a div element to display the error message)
        errorElement.classList.add('error'); // Adiciona a classe 'error' ao elemento div - (Adds the 'error' class to the div element)
        errorElement.innerHTML = error; // Define o conteúdo do elemento div como a mensagem de erro - (Sets the content of the div element as the error message)
        input.parentElement.insertBefore(errorElement, input.nextElementSibling); // Insere o elemento div de erro após o input - (Inserts the error div element after the input)
    },

    clearErrors:() => {
        let inputs = form.querySelectorAll('input'); // Seleciona todos os inputs dentro do formulário - (Selects all inputs within the form)
        for(let i=0; i < inputs.length; i++) {
            inputs[i].style = ''; // Remove o estilo da borda dos inputs - (Removes the border style from the inputs)
        }

        let errorElements = document.querySelectorAll('.error'); // Seleciona todos os elementos com a classe 'error' - (Selects all elements with the 'error' class)
        for(let i=0; i < errorElements.length; i++) {
            errorElements[i].remove(); // Remove os elementos de erro do DOM - (Removes the error elements from the DOM)
        }
    }
};

let form = document.querySelector('.validador'); // Seleciona o formulário com a classe 'validador' - (Selects the form with the class 'validador')
form.addEventListener('submit', Validador.handleSubmit); // Adiciona um ouvinte de evento de envio ao formulário e chama a função handleSubmit quando o formulário é enviado
