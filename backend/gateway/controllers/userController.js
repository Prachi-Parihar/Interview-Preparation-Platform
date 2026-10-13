export const getCurrentUser = async (req,res) => {
    try{
        return res.status(200).json({user:req.user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.message});
    }
}