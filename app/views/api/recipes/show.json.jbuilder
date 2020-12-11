json.recipe do
    json.set! @recipe.id do
        json.extract! @recipe, :id, :author_id, :title, :yield, :time, :description, :directions, :tip
        json.photoUrl url_for(@recipe.photo)
    end
end

json.author do
    json.set! @recipe.author.id do
        json.extract! @recipe.author, :id, :first_name, :last_name
    end
end

json.ingredient_lists do 
    @recipe.ingredient_lists.each do |list|
        json.set! list.id do
            json.extract! list, :id, :header, :order
        end
    end
end

json.ingredients do 
    @recipe.ingredients.each do |ingredient|
        json.set! ingredient.id do
            json.extract! ingredient, :id, :ingredient_list_id, :order, :unit, :item, :amount
        end
    end
end