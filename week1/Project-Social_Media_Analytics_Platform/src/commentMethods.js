const { Comment } = require('../models');

async function getCommentTree(postId) {
    const comments = await Comment.findAll({
        where: { post_id: postId },
        order: [['created_at', 'ASC']],
        raw: true
    });

    const commentMap = new Map();
    comments.forEach(comment => {
        comment.replies = [];
        commentMap.set(comment.id, comment);
    });

    const commentTree = [];
    comments.forEach(comment => {
        if (comment.parent_comment_id) {
            const parent = commentMap.get(comment.parent_comment_id);
            if (parent) {
                parent.replies.push(comment);
            }
        } else {
            commentTree.push(comment);
        }
    });

    return commentTree;
}

function calculateMaxDepth(commentNode) {
    if (!commentNode.replies || commentNode.replies.length === 0) {
        return 1;
    }
    const childDepths = commentNode.replies.map(calculateMaxDepth);
    return 1 + Math.max(...childDepths);
}

async function analyzeComments(postId) {
    const commentTree = await getCommentTree(postId);

    const analysis = commentTree.map(rootComment => {
        return {
            commentId: rootComment.id,
            content: rootComment.content,
            engagementScore: {
                maxDepth: calculateMaxDepth(rootComment)
            }
        };
    });

    return analysis;
}

module.exports = { analyzeComments };

