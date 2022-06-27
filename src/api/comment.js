import request from '@/utils/request'

// 获取评论列表
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 评论点赞
export const commentLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消评论点赞
export const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 添加文章评论或评论回复
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
