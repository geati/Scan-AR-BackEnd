import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, BaseEntity } from "typeorm"
import CommentModel from "./Comment.model"
import UserModel from "./User.model"

@Entity()
export default class PostModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @Column({ nullable: true })
    userId!: number;

    @Column({ type: "boolean", default: true})
    visible!: boolean

    @ManyToOne((_type) => UserModel, (user: UserModel) => user.posts)
    @JoinColumn()
    user!: UserModel;

    @OneToMany((_type) => CommentModel, (comment: CommentModel) => comment.post)
    comments!: Array<CommentModel>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
