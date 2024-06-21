import {Column, Entity, PrimaryGeneratedColumn, BaseEntity, Index} from 'typeorm'

@Entity()
@Index(['id'], { unique: true })
export class direccion extends BaseEntity {
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
}