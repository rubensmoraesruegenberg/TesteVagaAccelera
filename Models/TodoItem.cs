using System;
using System.ComponentModel.DataAnnotations;


namespace Accelera.Models
{
    public class TodoItem
    {
        [Key]
        public Int32 Id { get; set; }

        public String Nome { get; set; }
        public Boolean Concluida { get; set; }

    }
}