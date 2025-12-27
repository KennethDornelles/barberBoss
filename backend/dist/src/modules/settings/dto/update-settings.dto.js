"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettingsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_settings_dto_1 = require("./create-settings.dto");
class UpdateSettingsDto extends (0, swagger_1.PartialType)(create_settings_dto_1.CreateSettingsDto) {
}
exports.UpdateSettingsDto = UpdateSettingsDto;
//# sourceMappingURL=update-settings.dto.js.map