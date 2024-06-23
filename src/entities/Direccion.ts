import {Column, Entity, PrimaryGeneratedColumn, BaseEntity, Index, ManyToOne, JoinColumn} from 'typeorm'
import {UsuarioEntity} from './Usuario'
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute'

@Entity({name:"direccion"})
@Index(['id'], { unique: true })
export class DireccionEntity extends BaseEntity {
    mensaje(mensaje: any) {
        throw new Error('Method not implemented.')
    }
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    calle:string

    @Column()
    numero:string

    @Column()
    ciudad:string

    @Column()
    usuarioId:number
    static assign: any

    @ManyToOne(()=>UsuarioEntity, (usuario)=>usuario.usuarioId)
    @JoinColumn({name:"usuarioId"})
    usuario!:UsuarioEntity

}