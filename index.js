document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("myForm");
  
    form.addEventListener("blur", function(event) {
      validateField(event.target);
    }, true);
  
    form.addEventListener("focus", function(event) {
      const errorDiv = event.target.nextElementSibling;
      if (errorDiv.classList.contains("error-message")) {
        errorDiv.textContent = "";
      }
    }, true);
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      if (validateForm()) {
        displaySuccessMessage();
      }
    });
  
    function validateField(input) {
      const fieldName = input.name;
      const value = input.value.trim();
      let errorMessage = "";
  
      switch (fieldName) {
        case "fullName":
          if (value.length < 6 || value.indexOf(" ") === -1) {
            errorMessage = "Debe tener más de 6 letras y al menos un espacio entre medio.";
          }
          break;
        case "email":
          if (!validateEmail(value)) {
            errorMessage = "Debe tener un formato de email válido.";
          }
          break;
        case "password":
          if (value.length < 8 || !value.match(/[a-zA-Z]/) || !value.match(/[0-9]/)) {
            errorMessage = "Debe tener al menos 8 caracteres, formados por letras y números.";
          }
          break;
          case "confirmPassword":
            const password = document.getElementById("password").value.trim();
            if (value.length < 8 || !value.match(/[a-zA-Z]/) || !value.match(/[0-9]/)) {
              errorMessage = "Debe tener al menos 8 caracteres, formados por letras y números.";
            } else if (value !== password) {
              errorMessage = "Las contraseñas no coinciden.";
            }
            break;
        case "age":
          if (value === "" || parseInt(value) < 18) {
            errorMessage = "Debe ser un número entero mayor o igual a 18.";
          }
          break;
        case "phone":
          if (value.length < 7 || !value.match(/^\d+$/)) {
            errorMessage = "Debe tener al menos 7 dígitos y no debe contener espacios, guiones ni paréntesis.";
          }
          break;
        case "address":
          if (value.length < 5 || !value.match(/^[\w\s]+$/)) {
            errorMessage = "Debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.";
          }
          break;
        case "city":
          if (value.length < 3) {
            errorMessage = "Debe tener al menos 3 caracteres.";
          }
          break;
        case "postalCode":
          if (value.length < 3) {
            errorMessage = "Debe tener al menos 3 caracteres.";
          }
          break;
        case "dni":
          if (value.length !== 7 && value.length !== 8) {
            errorMessage = "Debe tener 7 u 8 dígitos.";
          }
          break;
      }
  
      displayErrorMessage(input, errorMessage);
    }
  
    function validateForm() {
      const inputs = form.querySelectorAll("input");
      let isValid = true;
  
      inputs.forEach(function(input) {
        validateField(input);
        const errorDiv = input.nextElementSibling;
        if (errorDiv.textContent !== "") {
          isValid = false;
        }
      });
  
      return isValid;
    }
  
    function displayErrorMessage(input, message) {
      const errorDiv = input.nextElementSibling;
      if (errorDiv.classList.contains("error-message")) {
        errorDiv.textContent = message;
      }
    }
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    function displaySuccessMessage() {
      const formData = new FormData(form);
      let message = "Formulario enviado:\n\n";
      for (const [name, value] of formData) {
        message += `${name}: ${value}\n`;
      }
      alert(message);
      form.reset();
    }
  });
  