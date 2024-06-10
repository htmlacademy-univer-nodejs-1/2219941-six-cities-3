import {CommentService} from './comment-service.interface';
import {inject, injectable} from 'inversify';
import {Component, SortType} from '../../../types';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity';
import {CreateCommentDto} from './dto/create-comment.dto';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate(['offerId', 'userId']);
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .sort({createdAt: SortType.Down})
      .populate(['offerId', 'userId']);
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
