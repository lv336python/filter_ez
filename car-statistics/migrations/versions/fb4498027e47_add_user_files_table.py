"""add user files table

Revision ID: fb4498027e47
Revises: 21e00d6e04e5
Create Date: 2018-09-13 14:53:21.079696

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb4498027e47'
down_revision = '21e00d6e04e5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_files',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('file_name', sa.String(), nullable=False),
    sa.Column('hash_name', sa.String(), nullable=False),
    sa.Column('create_date', sa.DateTime(), nullable=False),
    sa.Column('file_user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['file_user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users_files')
    # ### end Alembic commands ###
