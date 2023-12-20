var documenterSearchIndex = {"docs":
[{"location":"recursive_array_functions/#Recursive-Array-Functions","page":"Recursive Array Functions","title":"Recursive Array Functions","text":"","category":"section"},{"location":"recursive_array_functions/","page":"Recursive Array Functions","title":"Recursive Array Functions","text":"These are functions designed for recursive arrays, like arrays of arrays, and do not require that the RecursiveArrayTools types are used.","category":"page"},{"location":"recursive_array_functions/#Function-List","page":"Recursive Array Functions","title":"Function List","text":"","category":"section"},{"location":"recursive_array_functions/","page":"Recursive Array Functions","title":"Recursive Array Functions","text":"recursivecopy\nrecursivecopy!\nvecvecapply\ncopyat_or_push!","category":"page"},{"location":"recursive_array_functions/#RecursiveArrayTools.recursivecopy","page":"Recursive Array Functions","title":"RecursiveArrayTools.recursivecopy","text":"recursivecopy(b::AbstractArray{T, N}, a::AbstractArray{T, N})\n\nA recursive copy function. Acts like a deepcopy on arrays of arrays, but like copy on arrays of scalars.\n\n\n\n\n\n","category":"function"},{"location":"recursive_array_functions/#RecursiveArrayTools.recursivecopy!","page":"Recursive Array Functions","title":"RecursiveArrayTools.recursivecopy!","text":"recursivecopy!(b::AbstractArray{T, N}, a::AbstractArray{T, N})\n\nA recursive copy! function. Acts like a deepcopy! on arrays of arrays, but like copy! on arrays of scalars.\n\n\n\n\n\n","category":"function"},{"location":"recursive_array_functions/#RecursiveArrayTools.vecvecapply","page":"Recursive Array Functions","title":"RecursiveArrayTools.vecvecapply","text":"vecvecapply(f::Base.Callable, v)\n\nCalls f on each element of a vecvec v.\n\n\n\n\n\n","category":"function"},{"location":"recursive_array_functions/#RecursiveArrayTools.copyat_or_push!","page":"Recursive Array Functions","title":"RecursiveArrayTools.copyat_or_push!","text":"copyat_or_push!{T}(a::AbstractVector{T}, i::Int, x)\n\nIf i<length(x), it's simply a recursivecopy! to the ith element. Otherwise, it will push! a deepcopy.\n\n\n\n\n\n","category":"function"},{"location":"array_types/#Recursive-Array-Types","page":"Recursive Array Types","title":"Recursive Array Types","text":"","category":"section"},{"location":"array_types/","page":"Recursive Array Types","title":"Recursive Array Types","text":"The Recursive Array types are types which implement an AbstractArray interface so that recursive arrays can be handled with standard array functionality. For example, wrapped arrays will automatically do things like recurse broadcast, define optimized mapping and iteration functions, and more.","category":"page"},{"location":"array_types/#Abstract-Types","page":"Recursive Array Types","title":"Abstract Types","text":"","category":"section"},{"location":"array_types/#Concrete-Types","page":"Recursive Array Types","title":"Concrete Types","text":"","category":"section"},{"location":"array_types/","page":"Recursive Array Types","title":"Recursive Array Types","text":"VectorOfArray\nDiffEqArray\nArrayPartition","category":"page"},{"location":"array_types/#RecursiveArrayTools.VectorOfArray","page":"Recursive Array Types","title":"RecursiveArrayTools.VectorOfArray","text":"VectorOfArray(u::AbstractVector)\n\nA VectorOfArray is an array which has the underlying data structure Vector{AbstractArray{T}} (but, hopefully, concretely typed!). This wrapper over such data structures allows one to lazily act like it's a higher-dimensional vector, and easily convert it to different forms. The indexing structure is:\n\nA[i] # Returns the ith array in the vector of arrays\nA[j, i] # Returns the jth component in the ith array\nA[j1, ..., jN, i] # Returns the (j1,...,jN) component of the ith array\n\nwhich presents itself as a column-major matrix with the columns being the arrays from the vector. The AbstractArray interface is implemented, giving access to copy, push, append!, etc. functions, which act appropriately. Points to note are:\n\nThe length is the number of vectors, or length(A.u) where u is the vector of arrays.\nIteration follows the linear index and goes over the vectors\n\nAdditionally, the convert(Array,VA::AbstractVectorOfArray) function is provided, which transforms the VectorOfArray into a matrix/tensor. Also, vecarr_to_vectors(VA::AbstractVectorOfArray) returns a vector of the series for each component, that is, A[i,:] for each i. A plot recipe is provided, which plots the A[i,:] series.\n\n\n\n\n\n","category":"type"},{"location":"array_types/#RecursiveArrayTools.DiffEqArray","page":"Recursive Array Types","title":"RecursiveArrayTools.DiffEqArray","text":"DiffEqArray(u::AbstractVector, t::AbstractVector)\n\nThis is a VectorOfArray, which stores A.t that matches A.u. This will plot (A.t[i],A[i,:]). The function tuples(diffeq_arr) returns tuples of (t,u).\n\nTo construct a DiffEqArray\n\nt = 0.0:0.1:10.0\nf(t) = t - 1\nf2(t) = t^2\nvals = [[f(tval) f2(tval)] for tval in t]\nA = DiffEqArray(vals, t)\nA[1, :]  # all time periods for f(t)\nA.t\n\n\n\n\n\n","category":"type"},{"location":"array_types/#RecursiveArrayTools.ArrayPartition","page":"Recursive Array Types","title":"RecursiveArrayTools.ArrayPartition","text":"ArrayPartition(x::AbstractArray...)\n\nAn ArrayPartition A is an array, which is made up of different arrays A.x. These index like a single array, but each subarray may have a different type. However, broadcast is overloaded to loop in an efficient manner, meaning that A .+= 2.+B is type-stable in its computations, even if A.x[i] and A.x[j] do not match types. A full array interface is included for completeness, which allows this array type to be used in place of a standard array where such a type stable broadcast may be needed. One example is in heterogeneous differential equations for DifferentialEquations.jl.\n\nAn ArrayPartition acts like a single array. A[i] indexes through the first array, then the second, etc., all linearly. But A.x is where the arrays are stored. Thus, for:\n\nusing RecursiveArrayTools\nA = ArrayPartition(y, z)\n\nwe would have A.x[1]==y and A.x[2]==z. Broadcasting like f.(A) is efficient.\n\n\n\n\n\n","category":"type"},{"location":"#RecursiveArrayTools.jl:-Arrays-of-Arrays-and-Even-Deeper","page":"Home","title":"RecursiveArrayTools.jl: Arrays of Arrays and Even Deeper","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"RecursiveArrayTools.jl is a set of tools for dealing with recursive arrays, like arrays of arrays. It contains type wrappers for making recursive arrays act more like normal arrays (for example, automating the recursion of broadcast, maps, iteration, and more), and utility functions which make it easier to work with recursive arrays.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install RecursiveArrayTools.jl, use the Julia package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"RecursiveArrayTools\")","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nSee the SciML Style Guide for common coding practices and other style decisions.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Zulip\nOn the Julia Discourse forums\nSee also SciML Community page","category":"page"},{"location":"#Reproducibility","page":"Home","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"<details><summary>The documentation of this SciML package was built using these direct dependencies,</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>and using this machine and Julia version.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using InteractiveUtils # hide\nversioninfo() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>A more complete overview of all dependencies and their versions is also provided.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status(; mode = PKGMODE_MANIFEST) # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TOML\nusing Markdown\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink_manifest = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n                \"/assets/Manifest.toml\"\nlink_project = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n               \"/assets/Project.toml\"\nMarkdown.parse(\"\"\"You can also download the\n[manifest]($link_manifest)\nfile and the\n[project]($link_project)\nfile.\n\"\"\")","category":"page"}]
}
