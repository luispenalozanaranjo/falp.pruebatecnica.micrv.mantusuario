"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = void 0;
const typeorm_1 = require("typeorm");
let usuario = class usuario extends typeorm_1.BaseEntity {
    mensaje(mensaje) {
        throw new Error('Method not implemented.');
    }
};
exports.usuario = usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], usuario.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], usuario.prototype, "rut", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: ''
    }),
    __metadata("design:type", String)
], usuario.prototype, "primerApellido", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: ''
    }),
    __metadata("design:type", String)
], usuario.prototype, "segundoApellido", void 0);
exports.usuario = usuario = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['rut'], { unique: true })
], usuario);
