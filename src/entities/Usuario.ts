import {Column, Entity, PrimaryGeneratedColumn, BaseEntity, Index, OneToMany} from 'typeorm'
import {DireccionEntity} from './Direccion'

@Entity({name:"usuario"})
@Index(['rut'], { unique: true })
export class UsuarioEntity extends BaseEntity {
    mensaje(mensaje: any) {
        throw new Error('Method not implemented.')
    }

    @PrimaryGeneratedColumn()
    usuarioId:number

    @Column()
    rut:string

    @Column()
    nombre:string

    @Column({
        default:''
    })
    primerApellido:string

    @Column({
        default:''
    })
    segundoApellido:string
    static assign: any

    @OneToMany(()=>DireccionEntity, (direccion)=>direccion.usuario)
    usuario!:DireccionEntity[];

}