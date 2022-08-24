import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, BaseEntity, JoinColumn, OneToOne } from "typeorm"
import PostModel from "./Post.model"
import CommentModel from "./Comment.model"


@Entity()
export default class UserModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: String;

    @Column()
    lastName!: String;

    @Column()
    phone!: String;

    @Column()
    birthDate!: Date;

    @Column()
    email!: String;

    @Column()
    password!: String;

    @Column({ type: "boolean", default: true})
    visible!: boolean

    @OneToMany((_type) => PostModel, (post: PostModel) => post.user)
    posts!: Array<PostModel>;

    @OneToMany((_type) => CommentModel, (comment: CommentModel) => comment.user)
    comments!: Array<CommentModel>;


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
