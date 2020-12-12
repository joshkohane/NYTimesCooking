@recipes.each do |recipe|
    json.set! recipe.id do
        json.extract! recipe, :id, :title, :time, :directions
        json.photoUrl url_for(recipe.photo)
        json.author_first_name recipe.author.first_name 
        json.author_last_name recipe.author.last_name
    end
end