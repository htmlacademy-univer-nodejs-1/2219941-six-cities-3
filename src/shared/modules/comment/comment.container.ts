import {Container} from 'inversify';
import {Component} from '../../../types';
import {DefaultCommentService} from './default-comment.service';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity';
import {CommentService} from './comment-service.interface';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
