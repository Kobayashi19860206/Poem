json.extract!( @user, :id, :username, :img_url, :description)

json.poem_ids @user.poem_ids

json.liked_poem_ids @user.liked_poem_ids
