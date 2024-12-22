import { defineRule, configure, useForm } from "vee-validate";
import {
  required,
  email,
  confirmed,
  numeric,
  regex,
  min_value,
  max_value,
  min,
  max,
} from "@vee-validate/rules";

const setDefaultValidationRules = () => {
  configure({
    generateMessage: (context) => {
      if (context.rule?.name === "required") {
        // console.log(context, 'CONTEXT');
        return `Поле ${context.field} обязательно для заполнения`;
      }
      if (context.rule?.name === "email") {
        return `${context.field} должен быть правильного формата`;
      }
      if (context.rule?.name === "confirmed") {
        return `${context.field} должен совпадать`;
      }
      if (context.rule?.name === "numeric") {
        return `Поле ${context.field} должно быть числовым`;
      }
      if (context.rule?.name === "regex") {
        return `Поле ${context.field} не подходит под заданное правило`;
      }

      return `${context.field} содержит некоректные данные`;
    },
  });

  defineRule("required", required);
  defineRule("email", email);
  defineRule("confirmed", confirmed);
  defineRule("numeric", numeric);
  defineRule("regex", regex);
  defineRule("min_value", min_value);
  defineRule("max_value", max_value);
  defineRule("min", min);
  defineRule("max", max);

  defineRule("decimal", (value, { decimals = "*", separator = "." }) => {
    if (value === null || value === undefined || value === "") {
      return false;
    }

    // if is 0.
    if (Number(decimals) === 0) {
      return /^-?\d*$/.test(value);
    }

    const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    );

    if (!regex.test(value)) {
      return `Поле должно быть числовым и может содержать до ${decimals} десятичных чисел`;
    }

    const parsedValue = parseFloat(value);

    return parsedValue === parsedValue;
  });

  defineRule("minMax", (value, { min, max }) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    const numericValue = Number(value);
    if (numericValue < Number(min)) {
      return `Поле должно быть ≥ ${min}`;
    }
    if (numericValue > Number(max)) {
      return `Поле должно быть ≤ ${max}`;
    }
    return true;
  });
};
export default setDefaultValidationRules;
