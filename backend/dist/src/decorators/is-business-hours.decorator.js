"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBusinessHours = IsBusinessHours;
const class_validator_1 = require("class-validator");
function IsBusinessHours(options = {}, validationOptions) {
    const { startHour = 8, endHour = 18, workingDays = [1, 2, 3, 4, 5, 6], } = options;
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isBusinessHours',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (!value)
                        return true;
                    try {
                        const date = new Date(value);
                        if (isNaN(date.getTime())) {
                            return false;
                        }
                        const day = date.getDay();
                        const hour = date.getHours();
                        if (!workingDays.includes(day)) {
                            return false;
                        }
                        if (hour < startHour || hour >= endHour) {
                            return false;
                        }
                        return true;
                    }
                    catch {
                        return false;
                    }
                },
                defaultMessage(args) {
                    const daysOfWeek = [
                        'Domingo',
                        'Segunda-feira',
                        'Terça-feira',
                        'Quarta-feira',
                        'Quinta-feira',
                        'Sexta-feira',
                        'Sábado',
                    ];
                    const workingDaysNames = workingDays
                        .map((day) => daysOfWeek[day])
                        .join(', ');
                    return `${args.property} deve ser dentro do horário comercial (${startHour}:00 - ${endHour}:00) e em dias úteis (${workingDaysNames})`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-business-hours.decorator.js.map