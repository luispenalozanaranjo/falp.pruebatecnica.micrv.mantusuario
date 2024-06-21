import {Column, Entity, PrimaryGeneratedColumn, BaseEntity, Index} from 'typeorm'

@Entity()
@Index(['rut'], { unique: true })
export class usuario extends BaseEntity {
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

}